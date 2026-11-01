"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { getApi } from "@/components/api/useApi";
import ProductCard from "@/components/catalog/ProductCard";
import SortSelect from "@/components/catalog/SortSelect";
import SellerStoreHeader, { type SellerStore } from "@/components/seller/SellerStoreHeader";

// Fields of GET /products that this page uses
interface ApiProduct {
  id: string;
  name: string;
  price: number;
  oldCost?: number | null;
  rating?: number;
  sellerId?: string;
  createdAt?: string;
  imageUrl?: string;
  images?: string[];
  galleries?: { path: string }[];
  productGalleries?: { path: string }[];
}

type LoadState = "loading" | "ready" | "not-found" | "error";

const getProductImage = (product: ApiProduct) =>
  product.imageUrl ||
  product.images?.[0] ||
  product.galleries?.[0]?.path ||
  product.productGalleries?.[0]?.path ||
  "";

function sortProducts(products: ApiProduct[], sort: string) {
  const sorted = [...products];
  switch (sort) {
    case "Price: Low to High":
      return sorted.sort((a, b) => a.price - b.price);
    case "Price: High to Low":
      return sorted.sort((a, b) => b.price - a.price);
    case "Avg. Customer Review":
      return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    case "Newest Arrivals":
      return sorted.sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""));
    default:
      return sorted;
  }
}

export default function SellerStorePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [seller, setSeller] = useState<SellerStore | null>(null);
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [state, setState] = useState<LoadState>("loading");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("Featured");

  useEffect(() => {
    if (!id) return;
    let cancelled = false;

    async function load() {
      try {
        const [sellerRes, productsRes] = await Promise.all([
          getApi(`/sellers/${id}`),
          getApi(`/products?sellerId=${id}&isActive=true`),
        ]);
        if (cancelled) return;

        if (sellerRes.response.status === 404 || !sellerRes.data?.id) {
          setState(sellerRes.response.ok || sellerRes.response.status === 404 ? "not-found" : "error");
          return;
        }

        setSeller(sellerRes.data as SellerStore);
        // Filter on the client too, in case the backend ignores the sellerId parameter
        const list = Array.isArray(productsRes.data) ? (productsRes.data as ApiProduct[]) : [];
        setProducts(list.filter((product) => product.sellerId === id));
        setState("ready");
      } catch (err) {
        console.error("Failed to load seller store", err);
        if (!cancelled) setState("error");
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  const visibleProducts = useMemo(() => {
    const search = query.trim().toLowerCase();
    const filtered = search
      ? products.filter((product) => product.name.toLowerCase().includes(search))
      : products;
    return sortProducts(filtered, sort);
  }, [products, query, sort]);

  if (state === "loading") {
    return (
      <main className="mx-auto w-full max-w-[1440px] px-[16px] py-[24px] sm:px-[24px] lg:px-[40px] lg:py-[40px]">
        <div className="h-[280px] animate-pulse rounded-[20px] bg-[#F8F8F8]" />
        <div className="mt-[24px] grid grid-cols-2 gap-[16px] md:grid-cols-3 xl:grid-cols-5">
          {Array.from({ length: 5 }, (_, index) => (
            <div key={index} className="h-[300px] animate-pulse rounded-[10px] bg-[#F8F8F8]" />
          ))}
        </div>
      </main>
    );
  }

  if (state !== "ready" || !seller) {
    return (
      <main className="mx-auto flex w-full max-w-[700px] flex-col items-center px-[16px] py-[80px] text-center">
        <h1 className="text-[28px] font-black text-[#333333]">
          {state === "not-found" ? "Store not found" : "Couldn't load the store"}
        </h1>
        <p className="mt-[10px] text-[15px] text-[#555555]">
          {state === "not-found"
            ? "This seller doesn't exist or is no longer on TreeMiix."
            : "The server may be waking up. Please try again in a few seconds."}
        </p>
        <Link
          href="/catalog"
          className="tm-press mt-[24px] flex h-[46px] items-center justify-center rounded-[12px] bg-[linear-gradient(90deg,#FFDB5A_0%,#FF825A_100%)] px-[26px] text-[16px] font-medium text-white"
        >
          Browse all products
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-[1440px] px-[16px] pb-[70px] pt-[24px] font-[var(--font-roboto)] sm:px-[24px] lg:px-[40px] lg:pb-[90px] lg:pt-[40px]">
      <SellerStoreHeader seller={seller} productsCount={products.length} />

      {/* Products */}
      <section className="tm-fade-up tm-delay-1 mt-[28px] lg:mt-[36px]">
        <div className="flex flex-col gap-[14px] sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-[22px] font-medium text-[#333333] sm:text-[24px]">
            Products from this store
          </h2>

          <div className="flex flex-col gap-[12px] sm:flex-row sm:items-center">
            <label className="relative flex h-[38px] w-full items-center sm:w-[260px]">
              <span className="sr-only">Search in this store</span>
              <Search size={16} aria-hidden="true" className="pointer-events-none absolute left-[14px] text-[#999999]" />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search in this store"
                className="h-full w-full rounded-full border border-[#DDD] bg-white pl-[38px] pr-[14px] text-[14px] text-[#333333] outline-none transition-colors placeholder:text-[#999999] focus:border-[#7C9BC0]"
              />
            </label>
            <SortSelect value={sort} onChange={setSort} />
          </div>
        </div>

        {visibleProducts.length === 0 ? (
          <p className="mt-[40px] rounded-[20px] bg-[#F8F8F8] px-[20px] py-[40px] text-center text-[15px] text-[#555555]">
            {products.length === 0 ? "This store has no products yet." : "No products match your search."}
          </p>
        ) : (
          <div className="mt-[22px] grid grid-cols-1 justify-items-center gap-[20px] min-[480px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {visibleProducts.map((product) => {
              const hasDiscount = Boolean(product.oldCost && product.oldCost > product.price);
              return (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  title={product.name}
                  stars={product.rating || 0}
                  priceSale={product.price}
                  priceOriginal={hasDiscount ? product.oldCost ?? undefined : undefined}
                  isSale={hasDiscount}
                  shipTo="Ukraine"
                  imageSrc={getProductImage(product)}
                  onClick={() => router.push(`/product/${product.id}`)}
                />
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
