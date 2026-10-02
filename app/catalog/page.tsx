'use client';

import ActiveFiltersBar from "@/components/catalog/ActiveFiltersBar";
import { CategoryHeader } from "@/components/catalog/CategoryHeader";
import Filter from "@/components/catalog/Filter";
import Pagination from "@/components/catalog/Pagination";
import ProductCard from "@/components/catalog/ProductCard";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState, useEffect, useMemo } from "react";
import { getApi } from "@/components/api/useApi";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://treemiix-backend.onrender.com/api";

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  "Arts & Crafts": "Shop art supplies, craft kits, DIY materials and more.",
  "Baby": "Shop baby clothing, strollers, feeding essentials and more.",
  "Beauty & Personal Care": "Shop makeup, skin care, hair care, fragrances and more.",
  "Computers": "Shop laptops, desktops, components, accessories and more.",
  "Electronics": "Shop phones, TVs, audio, cameras and smart devices.",
  "Home & Kitchen": "Shop cookware, appliances, home decor, storage and more.",
  "Men's Fashion": "Shop men's clothing, shoes, watches and accessories.",
  "Smart Home": "Shop smart lighting, voice assistants, security and more.",
  "Sports & Outdoors": "Shop fitness gear, camping, cycling equipment and more.",
  "Tools & Home Improvement": "Shop power tools, hardware, garden supplies and more.",
  "Women's Fashion": "Shop women's clothing, shoes, bags and accessories.",
  "Footwear & Sports": "Shop sneakers, running shoes, trainers and sports gear.",
};

interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  oldCost?: number | null;
  imageUrl?: string;
  images?: string[];
  sku?: string;
  stock: number;
  manufacturer?: string;
  categoryId?: string;
  rating?: number;
  createdAt?: string;
  galleries?: { path?: string }[];
  productGalleries?: { path?: string }[];
  attributeValues?: { nameAttr?: string; value?: string }[];
}

function CatalogContent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<{ id: string; title: string }[]>([]);
  const [brands, setBrands] = useState<{ id: string; title: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<Record<string, boolean>>({});
  const [selectedBrands, setSelectedBrands] = useState<Record<string, boolean>>({});
  const [availability, setAvailability] = useState<Record<string, boolean>>({});
  const [selectedAttributes, setSelectedAttributes] = useState<Record<string, Record<string, boolean>>>({});
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(5000);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortValue, setSortValue] = useState<string>("Featured");

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const [prodRes, catRes] = await Promise.all([
          getApi("/products?isActive=true"),
          getApi("/categories").catch(() => ({ data: [] }))
        ]);

        if (Array.isArray(prodRes.data) && prodRes.data.length > 0) {
          const mapped = prodRes.data.map((p: Product) => ({
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
        sourceData.forEach((p: { manufacturer?: string }) => {
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
          const sortedCategories = [...catRes.data].sort(
            (a: { sortOrder?: number }, b: { sortOrder?: number }) =>
              (a.sortOrder ?? Number.MAX_SAFE_INTEGER) -
              (b.sortOrder ?? Number.MAX_SAFE_INTEGER)
          );
          setCategories(
            sortedCategories.map((c: { id: string; name: string }) => ({
              id: c.id,
              title: c.name,
            }))
          );
        }
      } catch (err) {
        console.error("Failed to fetch catalog data", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Sync filters from URL query params on mount and on client-side navigation
  // (?search=<query> searches across all categories, ?category=<id>, ?sale=1)
  useEffect(() => {
    async function syncFiltersFromUrl() {
      try {
        const searchParam = searchParams.get("search");
        if (searchParam) {
          setSearchQuery(searchParam);
          setSelectedCategories({});
        } else {
          const categoryParam = searchParams.get("category");
          if (categoryParam) {
            setSelectedCategories({ [categoryParam]: true });
          }
        }
        const saleParam = searchParams.get("sale");
        if (saleParam === "1" || saleParam === "true") {
          setAvailability((prev) => ({ ...prev, onSale: true }));
        }
      } catch {
        // Ignore malformed query strings
      }
    }
    syncFiltersFromUrl();
  }, [searchParams]);

  // Dynamic attribute groups (e.g. Color, Size) built from loaded products
  const attributeGroups = useMemo(() => {
    const map = new Map<string, Map<string, string>>();
    for (const p of products) {
      for (const av of p.attributeValues || []) {
        if (!av.nameAttr || !av.value) continue;
        if (!map.has(av.nameAttr)) map.set(av.nameAttr, new Map());
        map.get(av.nameAttr)!.set(av.value, av.value);
      }
    }
    return Array.from(map.entries()).map(([name, values]) => ({
      name,
      values: Array.from(values.values()).map((v) => ({ id: `${name}\u0000${v}`, title: v })),
    }));
  }, [products]);

  const hasAttributeSelection = Object.values(selectedAttributes).some(
    (group) => Object.values(group).some(Boolean)
  );

  // Filter products based on selected filters
  let filteredProducts = products.filter((p) => {
    // Search by name / description
    const query = searchQuery.trim().toLowerCase();
    if (query) {
      const inName = p.name.toLowerCase().includes(query);
      const inDescription = (p.description || "").toLowerCase().includes(query);
      if (!inName && !inDescription) return false;
    }
    // Department / Category filter (single-select)
    const activeCategories = Object.keys(selectedCategories).filter((k) => selectedCategories[k]);
    if (activeCategories.length > 0 && !activeCategories.includes(p.categoryId || "")) {
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
    // Availability filter
    if (availability.inStock && p.stock <= 0) return false;
    if (availability.onSale && !(p.oldCost && p.oldCost > p.price)) return false;
    // Attribute filters (each active group must match at least one selected value)
    if (hasAttributeSelection) {
      for (const group of attributeGroups) {
        const selectedValueIds = Object.keys(selectedAttributes[group.name] || {}).filter(
          (k) => selectedAttributes[group.name][k]
        );
        if (selectedValueIds.length === 0) continue;
        const productValueIds = (p.attributeValues || [])
          .filter((av) => av.nameAttr === group.name && av.value)
          .map((av) => `${group.name}\u0000${av.value}`);
        if (!selectedValueIds.some((id) => productValueIds.includes(id))) return false;
      }
    }
    // Price filter
    if (p.price < minPrice || p.price > maxPrice) {
      return false;
    }
    // Rating filter
    if (minRating > 0 && (p.rating || 0) < minRating) {
      return false;
    }
    return true;
  });

  // Sorting
  const onSaleFirst = (a: Product, b: Product) =>
    (b.oldCost && b.oldCost > b.price ? 1 : 0) - (a.oldCost && a.oldCost > a.price ? 1 : 0);
  switch (sortValue) {
    case "Price: Low to High":
      filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
      break;
    case "Price: High to Low":
      filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
      break;
    case "Avg. Customer Review":
      filteredProducts = [...filteredProducts].sort((a, b) => (b.rating || 0) - (a.rating || 0));
      break;
    case "Newest Arrivals":
      filteredProducts = [...filteredProducts].sort(
        (a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
      );
      break;
    case "Featured":
      filteredProducts = [...filteredProducts].sort(onSaleFirst);
      break;
    default:
      break;
  }

  const activeChips = [
    searchQuery.trim()
      ? {
          label: `Search: ${searchQuery.trim()}`,
          onRemove: () => {
            setSearchQuery("");
            const params = new URLSearchParams(searchParams.toString());
            params.delete("search");
            const query = params.toString();
            router.replace(query ? `/catalog?${query}` : "/catalog");
          },
        }
      : null,
    ...Object.keys(selectedCategories)
      .filter((k) => selectedCategories[k])
      .map((id) => ({
        label: categories.find((c) => c.id === id)?.title || "Category",
        onRemove: () => setSelectedCategories({}),
      })),
    ...Object.keys(selectedBrands).filter((k) => selectedBrands[k]).map((id) => ({
      label: brands.find((b) => b.id === id)?.title || 'Brand',
      onRemove: () => setSelectedBrands(prev => ({ ...prev, [id]: false }))
    })),
    availability.inStock
      ? { label: "In stock only", onRemove: () => setAvailability((p) => ({ ...p, inStock: false })) }
      : null,
    availability.onSale
      ? { label: "On sale only", onRemove: () => setAvailability((p) => ({ ...p, onSale: false })) }
      : null,
    ...attributeGroups.flatMap((group) =>
      Object.keys(selectedAttributes[group.name] || {})
        .filter((k) => selectedAttributes[group.name][k])
        .map((valueId) => ({
          label: `${group.name}: ${valueId.split("\u0000")[1]}`,
          onRemove: () =>
            setSelectedAttributes((prev) => ({
              ...prev,
              [group.name]: { ...prev[group.name], [valueId]: false },
            })),
        }))
    ),
  ].filter(Boolean) as { label: string; onRemove: () => void }[];

  const activeCategoryIds = Object.keys(selectedCategories).filter(
    (id) => selectedCategories[id]
  );
  const headerCategory =
    activeCategoryIds.length === 1
      ? categories.find((c) => c.id === activeCategoryIds[0])
      : undefined;

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row ml-12.5 mr-24.25 gap-23.25 w-full max-w-[1700px] px-8 py-6">
        <Filter 
          categories={categories}
          brands={brands}
          selectedCategories={selectedCategories}
          onCategoryChange={(id, checked) => setSelectedCategories(checked ? { [id]: true } : {})}
          selectedBrands={selectedBrands}
          onCheckboxChange={(id, checked) => setSelectedBrands(prev => ({ ...prev, [id]: checked }))}
          availability={availability}
          onAvailabilityChange={(id, checked) => setAvailability(prev => ({ ...prev, [id]: checked }))}
          attributeGroups={attributeGroups}
          selectedAttributes={selectedAttributes}
          onAttributeChange={(group, valueId, checked) =>
            setSelectedAttributes(prev => ({
              ...prev,
              [group]: { ...(prev[group] || {}), [valueId]: checked },
            }))
          }
          minPrice={minPrice}
          maxPrice={maxPrice}
          onPriceApply={(min, max) => { setMinPrice(min); setMaxPrice(max); }}
          minRating={minRating}
          onRatingChange={(r) => setMinRating(r)}
        />
        <div className="flex flex-col flex-1">
          <CategoryHeader
            title={headerCategory?.title || "All Products"}
            description={
              headerCategory
                ? CATEGORY_DESCRIPTIONS[headerCategory.title] ||
                  `Shop ${headerCategory.title} and more.`
                : "Shop makeup, skin care, home essentials and more."
            }
          />
          <ActiveFiltersBar
            selected={filteredProducts.length}
            chips={activeChips}
            sortValue={sortValue}
            onSortChange={setSortValue}
            onReset={() => {
              setSearchQuery("");
              setSelectedCategories({});
              setSelectedBrands({});
              setAvailability({});
              setSelectedAttributes({});
              setMinPrice(0);
              setMaxPrice(5000);
              setMinRating(0);
              setSortValue("Featured");
            }}
          />

          {loading ? (
            <div className="py-20 text-center text-[18px] text-[#555]">Loading products from backend...</div>
            ) : filteredProducts.length === 0 ? (
            <div className="py-20 text-center text-[18px] text-[#777]">No products matching current filters.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mb-10">
              {filteredProducts.map((p) => {
                const img = p.imageUrl || p.images?.[0] || "";
                const hasDiscount = Boolean(p.oldCost && p.oldCost > p.price);
                return (
                  <ProductCard
                    key={p.id}
                    title={p.name}
                    stars={p.rating || 0}
                    priceSale={p.price}
                    priceOriginal={hasDiscount ? p.oldCost! : undefined}
                    isSale={hasDiscount}
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

export default function CatalogPage() {
  return (
    <Suspense fallback={null}>
      <CatalogContent />
    </Suspense>
  );
}