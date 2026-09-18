'use client';

import ActiveFiltersBar from "@/components/catalog/ActiveFiltersBar";
import { CategoryHeader } from "@/components/catalog/CategoryHeader";
import Filter from "@/components/catalog/Filter";
import Pagination from "@/components/catalog/Pagination";
import ProductCard from "@/components/catalog/ProductCard";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { getApi } from "@/components/api/useApi";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://treemiix-backend.onrender.com/api";

interface Product {
  id: string;
  name: string;
  price: number;
  oldCost?: number;
  imageUrl?: string;
  images?: string[];
  sku?: string;
  stock: number;
  manufacturer?: string;
  categoryId?: string;
  rating?: number;
}

export default function CatalogPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<{ id: string; title: string }[]>([]);
  const [brands, setBrands] = useState<{ id: string; title: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBrands, setSelectedBrands] = useState<Record<string, boolean>>({});
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(5000);
  const [minRating, setMinRating] = useState<number>(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const [prodRes, catRes] = await Promise.all([
          getApi("/products"),
          getApi("/categories").catch(() => ({ data: [] }))
        ]);

        if (Array.isArray(prodRes.data) && prodRes.data.length > 0) {
          const mapped = prodRes.data.map((p: any) => ({
            ...p,
            imageUrl: p.imageUrl || (p.images && p.images[0]) || (p.galleries && p.galleries[0]?.path) || (p.productGalleries && p.productGalleries[0]?.path) || ""
          }));
          setProducts(mapped);
        } else {
          setProducts([]);
        }

        const sourceData = Array.isArray(prodRes.data) && prodRes.data.length > 0 ? prodRes.data : [
          { manufacturer: "Apple" },
          { manufacturer: "Sony" },
          { manufacturer: "De'Longhi" },
          { manufacturer: "Nike" }
        ];

        const extractedBrandsMap = new Map();
        sourceData.forEach((p: any) => {
          if (p.manufacturer) {
            extractedBrandsMap.set(p.manufacturer, p.manufacturer);
          }
        });
        const brandList = Array.from(extractedBrandsMap.keys()).map((b, idx) => ({
          id: String(idx + 1),
          title: b as string
        }));
        setBrands(brandList);

        if (Array.isArray(catRes.data)) {
          setCategories(catRes.data.map((c: any) => ({
            id: c.id,
            title: c.name
          })));
        }
      } catch (err) {
        console.error("Failed to fetch catalog data", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Filter products based on selected filters
  const filteredProducts = products.filter((p: any) => {
    // Department / Category filter
    if (selectedCategory && p.categoryId !== selectedCategory) {
      return false;
    }
    // Brands filter (checkboxes)
    const activeBrandKeys = Object.keys(selectedBrands).filter((k) => selectedBrands[k]);
    if (activeBrandKeys.length > 0) {
      const brandTitles = activeBrandKeys.map((id) => brands.find((b) => b.id === id)?.title).filter(Boolean);
      if (!brandTitles.includes(p.manufacturer)) {
        return false;
      }
    }
    // Price filter
    if (p.price < minPrice || p.price > maxPrice) {
      return false;
    }
    // Rating filter
    if (minRating > 0 && (p.rating || 4) < minRating) {
      return false;
    }
    return true;
  });

  const activeChips = [
    selectedCategory ? { label: categories.find(c => c.id === selectedCategory)?.title || 'Category', onRemove: () => setSelectedCategory(null) } : null,
    ...Object.keys(selectedBrands).filter(k => selectedBrands[k]).map(id => ({
      label: brands.find(b => b.id === id)?.title || 'Brand',
      onRemove: () => setSelectedBrands(prev => ({ ...prev, [id]: false }))
    }))
  ].filter(Boolean) as { label: string; onRemove: () => void }[];

  const router = useRouter();

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row ml-12.5 mr-24.25 gap-23.25 w-full max-w-[1700px] px-8 py-6">
        <Filter 
          categories={categories}
          brands={brands}
          selectedCategory={selectedCategory}
          onSelectCategory={(id) => setSelectedCategory(id)}
          selectedBrands={selectedBrands}
          onCheckboxChange={(id, checked) => setSelectedBrands(prev => ({ ...prev, [id]: checked }))}
          minPrice={minPrice}
          maxPrice={maxPrice}
          onPriceApply={(min, max) => { setMinPrice(min); setMaxPrice(max); }}
          minRating={minRating}
          onRatingChange={(r) => setMinRating(r)}
        />
        <div className="flex flex-col flex-1">
          <CategoryHeader title="Catalog - Live API Products" description="Browse all products fetched directly from Treemiix Backend." />
          <ActiveFiltersBar
            selected={filteredProducts.length}
            chips={activeChips}
            onReset={() => {
              setSelectedCategory(null);
              setSelectedBrands({});
              setMinPrice(0);
              setMaxPrice(5000);
              setMinRating(0);
            }}
          />

          {loading ? (
            <div className="py-20 text-center text-[18px] text-[#555]">Loading products from backend...</div>
            ) : filteredProducts.length === 0 ? (
            <div className="py-20 text-center text-[18px] text-[#777]">No products matching current filters.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mb-10">
              {filteredProducts.map((p: any) => {
                const img = p.imageUrl || p.images?.[0] || "";
                return (
                  <ProductCard
                    key={p.id}
                    title={p.name}
                    stars={p.rating || 4}
                    priceSale={p.price}
                    priceOriginal={p.oldCost || p.price * 1.2}
                    shipTo="Ukraine"
                    imageSrc={img}
                    onClick={() => router.push(`/product/${p.id}`)}
                    id={p.id}
                  />
                );
              })}
            </div>
          )}

          <Pagination 
            totalPages={Math.ceil(filteredProducts.length / 10) || 1} 
            currentPage={currentPage} 
            onPageChange={(page) => setCurrentPage(page)} 
          />
        </div>
      </div>
    </div>
  );
}