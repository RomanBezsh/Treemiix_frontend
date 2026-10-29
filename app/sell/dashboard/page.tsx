"use client";

import { useCallback, useEffect, useState } from "react";
import { getApi } from "@/components/api/useApi";
import SellerAddProductModal from "@/components/sell/dashboard/SellerAddProductModal";
import SellerDashboardTopBar from "@/components/sell/dashboard/SellerDashboardTopBar";
import SellerListings from "@/components/sell/dashboard/SellerListings";
import SellerRecentOrders from "@/components/sell/dashboard/SellerRecentOrders";
import SellerSalesChart from "@/components/sell/dashboard/SellerSalesChart";
import SellerStatsCards from "@/components/sell/dashboard/SellerStatsCards";
import SellerTasks from "@/components/sell/dashboard/SellerTasks";
import {
  sellerFallbackCategories,
  sellerFallbackListings,
  sellerRecentOrders,
  sellerSalesByDay,
  sellerStats,
  sellerTasks,
  type SellerCategory,
  type SellerListing,
} from "@/data/sellerDashboardData";

const DEFAULT_STORE_NAME = "My TreeMiix Store";

// Fields of GET /products that this page uses
interface ApiProduct {
  id: string;
  name: string;
  price: number;
  oldCost?: number | null;
  stock?: number;
  rating?: number;
  sku?: string;
  sellerId?: string;
  seller?: { storeName?: string } | null;
  imageUrl?: string;
  images?: string[];
  galleries?: { path: string }[];
  productGalleries?: { path: string }[];
}

interface ApiCategory {
  id: string;
  name?: string;
  title?: string;
}

const getProductImage = (product: ApiProduct) =>
  product.imageUrl ||
  product.images?.[0] ||
  product.galleries?.[0]?.path ||
  product.productGalleries?.[0]?.path ||
  "";

/**
 * There are no seller accounts yet, so the page previews the dashboard
 * for the seller that owns the most active products.
 */
function pickSellerProducts(products: ApiProduct[]) {
  const bySeller = new Map<string, ApiProduct[]>();

  for (const product of products) {
    const key = product.sellerId ?? "unknown";
    bySeller.set(key, [...(bySeller.get(key) ?? []), product]);
  }

  let best: ApiProduct[] = [];
  for (const group of bySeller.values()) {
    if (group.length > best.length) best = group;
  }

  return {
    storeName: best[0]?.seller?.storeName || DEFAULT_STORE_NAME,
    listings: best.map<SellerListing>((product) => ({
      id: product.id,
      name: product.name,
      imageUrl: getProductImage(product),
      price: Number(product.price) || 0,
      oldCost: product.oldCost,
      stock: product.stock ?? 0,
      rating: product.rating,
      sku: product.sku,
    })),
  };
}

export default function SellerDashboardPage() {
  const [storeName, setStoreName] = useState(DEFAULT_STORE_NAME);
  const [listings, setListings] = useState<SellerListing[]>(sellerFallbackListings);
  const [isLive, setIsLive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<SellerCategory[]>(sellerFallbackCategories);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);

  useEffect(() => {
    async function loadProducts() {
      try {
        const { response, data } = await getApi("/products?isActive=true");

        if (response.ok && Array.isArray(data) && data.length > 0) {
          const seller = pickSellerProducts(data as ApiProduct[]);
          setStoreName(seller.storeName);
          setListings(seller.listings);
          setIsLive(true);
        }
      } catch (err) {
        console.error("Failed to load seller products, using demo data", err);
      } finally {
        setIsLoading(false);
      }
    }

    async function loadCategories() {
      try {
        const { response, data } = await getApi("/categories");

        if (response.ok && Array.isArray(data) && data.length > 0) {
          setCategories(
            (data as ApiCategory[]).map((category) => ({
              id: String(category.id),
              name: category.name || category.title || "Category",
            })),
          );
        }
      } catch {
        // Keep fallback categories
      }
    }

    loadProducts();
    loadCategories();
  }, []);

  const openAddProduct = useCallback(() => setIsAddProductOpen(true), []);
  const closeAddProduct = useCallback(() => setIsAddProductOpen(false), []);
  const handleCreateProduct = useCallback((listing: SellerListing) => {
    setListings((current) => [listing, ...current]);
  }, []);

  return (
    <main className="w-full bg-white font-[var(--font-roboto)]">
      <SellerDashboardTopBar storeName={storeName} onAddProduct={openAddProduct} />

      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-[24px] px-[20px] pb-[70px] pt-[28px] sm:px-[32px] lg:gap-[32px] lg:px-[80px] lg:pb-[100px] lg:pt-[40px]">
        {/* Preview notice */}
        <p className="tm-fade-up rounded-[14px] border border-dashed border-[#7C9BC0] px-[16px] py-[10px] text-[13px] leading-[150%] text-[#555555]">
          Seller dashboard preview. Sales, orders and action items are demo data; products are loaded from the store catalog. Products you add here are not saved yet.
        </p>

        {/* Overview */}
        <section id="overview" className="flex scroll-mt-[24px] flex-col gap-[24px] lg:gap-[32px]">
          <SellerStatsCards stats={sellerStats} />

          <div className="grid grid-cols-1 gap-[24px] lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:gap-[32px]">
            <SellerSalesChart data={sellerSalesByDay} />
            <SellerTasks tasks={sellerTasks} />
          </div>
        </section>

        {/* Orders */}
        <section id="orders" className="scroll-mt-[24px]">
          <SellerRecentOrders orders={sellerRecentOrders} />
        </section>

        {/* Products */}
        <section id="products" className="scroll-mt-[24px]">
          <SellerListings listings={listings} isLive={isLive} isLoading={isLoading} />
        </section>
      </div>

      {isAddProductOpen && (
        <SellerAddProductModal
          categories={categories}
          onClose={closeAddProduct}
          onCreate={handleCreateProduct}
        />
      )}
    </main>
  );
}
