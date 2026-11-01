"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { getApi } from "@/components/api/useApi";
import DealCard from "@/components/deals/DealCard";
import DealsPagination from "@/components/deals/DealsPagination";
import DealsSidebar, { type DealsDepartment } from "@/components/deals/DealsSidebar";
import DealsToolbar, { type ActiveFilterChip } from "@/components/deals/DealsToolbar";
import RecommendedDeals, { type DealCategoryTile } from "@/components/deals/RecommendedDeals";
import {
  ALMOST_GONE_STOCK,
  BEST_DISCOUNT_MIN,
  DEAL_TYPES,
  TOP_RATED_MIN,
  initialDealsFilters,
  type DealsFilters,
  type DealsSort,
} from "@/components/deals/dealsFilters";
import {
  readViewedIds,
  reasonLabel,
  scoreDeals,
  type DealCategory,
  type DealProduct,
  type ScoredDeal,
  type UserSignals,
} from "@/lib/deals";

const PAGE_SIZE = 15;
/** A deal counts as "for you" when the user is noticeably into its category */
const FOR_YOU_MIN_INTEREST = 0.35;

type LoadState = "loading" | "ready" | "error";

interface ApiCategory {
  id: string;
  name?: string;
  title?: string;
}

async function loadCartProductIds(): Promise<string[]> {
  if (!localStorage.getItem("token")) return [];
  try {
    const { response, data: cart } = await getApi("/carts/my");
    if (!response.ok || !cart?.id) return [];
    const { data: items } = await getApi(`/cartitems/bycart/${cart.id}`);
    return Array.isArray(items) ? items.map((item: { productId?: string }) => String(item.productId)).filter(Boolean) : [];
  } catch {
    return [];
  }
}

function sortDeals(deals: ScoredDeal[], sort: DealsSort) {
  const sorted = [...deals];
  switch (sort) {
    case "discount":
      return sorted.sort((a, b) => b.discountPct - a.discountPct);
    case "price-low":
      return sorted.sort((a, b) => a.product.price - b.product.price);
    case "price-high":
      return sorted.sort((a, b) => b.product.price - a.product.price);
    case "rating":
      return sorted.sort((a, b) => (b.product.rating || 0) - (a.product.rating || 0));
    default:
      return sorted; // already sorted by recommendation score
  }
}

function matchesFilters(deal: ScoredDeal, filters: DealsFilters) {
  const { product } = deal;
  const rating = Number(product.rating) || 0;
  const stock = product.stock ?? 99;

  if (filters.view === "for-you" && deal.interest < FOR_YOU_MIN_INTEREST) return false;
  if (filters.departments.length > 0 && !filters.departments.includes(String(product.categoryId))) return false;
  if (filters.dealType === "top-rated" && rating < TOP_RATED_MIN) return false;
  if (filters.dealType === "best-discount" && deal.discountPct < BEST_DISCOUNT_MIN) return false;
  if (filters.dealType === "almost-gone" && stock > ALMOST_GONE_STOCK) return false;
  if (filters.minPrice !== null && product.price < filters.minPrice) return false;
  if (filters.maxPrice !== null && product.price > filters.maxPrice) return false;
  if (deal.discountPct < filters.minDiscount) return false;
  if (rating < filters.minRating) return false;
  return true;
}

export default function TodaysDealsPage() {
  const [products, setProducts] = useState<DealProduct[]>([]);
  const [categories, setCategories] = useState<DealCategory[]>([]);
  const [signals, setSignals] = useState<UserSignals>({ viewedIds: [], cartIds: [] });
  const [state, setState] = useState<LoadState>("loading");

  const [filters, setFilters] = useState<DealsFilters>(initialDealsFilters);
  const [sort, setSort] = useState<DealsSort>("featured");
  const [page, setPage] = useState(1);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [productsRes, categoriesRes, cartIds] = await Promise.all([
          getApi("/products?isActive=true"),
          getApi("/categories").catch(() => ({ data: [] })),
          loadCartProductIds(),
        ]);
        if (cancelled) return;

        if (!Array.isArray(productsRes.data)) {
          setState("error");
          return;
        }

        setProducts(productsRes.data as DealProduct[]);
        setCategories(
          Array.isArray(categoriesRes.data)
            ? (categoriesRes.data as ApiCategory[]).map((category) => ({
                id: String(category.id),
                name: category.name || category.title || "Category",
              }))
            : []
        );
        setSignals({ viewedIds: readViewedIds(), cartIds });
        setState("ready");
      } catch (err) {
        console.error("Failed to load deals", err);
        if (!cancelled) setState("error");
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  // Every change of filters or sort starts from page 1
  const changeFilters = (next: DealsFilters) => {
    setFilters(next);
    setPage(1);
  };
  const changeSort = (next: DealsSort) => {
    setSort(next);
    setPage(1);
  };

  const scored = useMemo(() => scoreDeals(products, categories, signals), [products, categories, signals]);
  const forYouCount = useMemo(() => scored.filter((deal) => deal.interest >= FOR_YOU_MIN_INTEREST).length, [scored]);
  const hasHistory = signals.viewedIds.length > 0 || signals.cartIds.length > 0;

  const visible = useMemo(
    () => sortDeals(scored.filter((deal) => matchesFilters(deal, filters)), sort),
    [scored, filters, sort]
  );

  const totalPages = Math.max(1, Math.ceil(visible.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageDeals = visible.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const categoryName = useMemo(() => new Map(categories.map((category) => [category.id, category.name])), [categories]);

  // Departments and tiles are built from categories that actually have deals
  const departments: DealsDepartment[] = useMemo(() => {
    const counts = new Map<string, number>();
    scored.forEach((deal) => {
      const id = String(deal.product.categoryId ?? "");
      if (id) counts.set(id, (counts.get(id) ?? 0) + 1);
    });
    return [...counts.entries()]
      .map(([id, count]) => ({ id, name: categoryName.get(id) ?? "Other", count }))
      .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
  }, [scored, categoryName]);

  const tiles: DealCategoryTile[] = departments.slice(0, 6).map((department) => ({
    ...department,
    image: scored.find((deal) => String(deal.product.categoryId) === department.id && deal.image)?.image ?? "",
    active: filters.departments.includes(department.id),
  }));

  const toggleDepartment = (id: string) =>
    changeFilters({
      ...filters,
      departments: filters.departments.includes(id)
        ? filters.departments.filter((item) => item !== id)
        : [...filters.departments, id],
    });

  const chips: ActiveFilterChip[] = [
    ...(filters.view === "for-you"
      ? [{ key: "view", label: "For you", onRemove: () => changeFilters({ ...filters, view: "all" }) }]
      : []),
    ...filters.departments.map((id) => ({
      key: `dep-${id}`,
      label: categoryName.get(id) ?? "Department",
      onRemove: () => toggleDepartment(id),
    })),
    ...(filters.dealType !== "all"
      ? [{
          key: "type",
          label: DEAL_TYPES.find((type) => type.value === filters.dealType)?.label ?? "Deal type",
          onRemove: () => changeFilters({ ...filters, dealType: "all" }),
        }]
      : []),
    ...(filters.minPrice !== null || filters.maxPrice !== null
      ? [{
          key: "price",
          label: `$${filters.minPrice ?? 0} – ${filters.maxPrice !== null ? `$${filters.maxPrice}` : "any"}`,
          onRemove: () => changeFilters({ ...filters, minPrice: null, maxPrice: null }),
        }]
      : []),
    ...(filters.minDiscount > 0
      ? [{ key: "discount", label: `${filters.minDiscount}%+ off`, onRemove: () => changeFilters({ ...filters, minDiscount: 0 }) }]
      : []),
    ...(filters.minRating > 0
      ? [{ key: "rating", label: `${filters.minRating}★ & up`, onRemove: () => changeFilters({ ...filters, minRating: 0 }) }]
      : []),
  ];

  return (
    <main className="w-full bg-white font-[var(--font-roboto)]">
      <div className="mx-auto w-full max-w-[1600px] px-[16px] pb-[80px] pt-[24px] sm:px-[24px] lg:px-[40px]">
        <div className="flex flex-col gap-[28px] lg:flex-row lg:items-start lg:gap-[40px]">
          {/* Filters */}
          <div className="w-full lg:w-[280px] lg:shrink-0">
            <DealsSidebar filters={filters} onChange={changeFilters} departments={departments} forYouCount={forYouCount} />
          </div>

          {/* Main deals content */}
          <section className="min-w-0 flex-1">
            <h1 className="text-[20px] font-medium leading-[130%] text-[#333333]/80 sm:text-[24px]">
              {hasHistory ? "Recommended deals for you" : "Today's best deals"}
            </h1>
            <p className="mt-[4px] text-[13px] text-[#828282]">
              {hasHistory
                ? "Picked from what you viewed recently and what's in your cart, plus today's biggest discounts."
                : "Biggest discounts first. Browse a few products and this page will adapt to you."}
            </p>

            {/* Selected filters and sorting */}
            <div className="mt-[14px]">
              <DealsToolbar
                count={visible.length}
                chips={chips}
                onReset={() => changeFilters(initialDealsFilters)}
                sort={sort}
                onSortChange={changeSort}
              />
            </div>

            {state === "loading" && (
              <div className="mt-[42px] grid grid-cols-1 gap-[14px] sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
                {Array.from({ length: 10 }, (_, index) => (
                  <div key={index} className="h-[340px] animate-pulse rounded-[12px] bg-[#F8F8F8]" />
                ))}
              </div>
            )}

            {state === "error" && (
              <p className="mt-[42px] rounded-[12px] bg-[#F8F8F8] px-[20px] py-[40px] text-center text-[15px] text-[#555555]">
                Couldn&apos;t load deals. The server may be waking up — please refresh in a few seconds.
              </p>
            )}

            {state === "ready" && (
              <>
                {/* Categories */}
                <div className="mt-[28px]">
                  <RecommendedDeals items={tiles} onSelect={toggleDepartment} />
                </div>

                {/* Deals grid */}
                {pageDeals.length === 0 ? (
                  <div className="mt-[42px] rounded-[12px] bg-[#F8F8F8] px-[20px] py-[40px] text-center">
                    <p className="text-[15px] text-[#555555]">
                      {scored.length === 0 ? "No deals right now — check back later." : "No deals match these filters."}
                    </p>
                    {chips.length > 0 && (
                      <button
                        type="button"
                        onClick={() => changeFilters(initialDealsFilters)}
                        className="mt-[14px] text-[14px] font-medium text-[#496B94] hover:underline"
                      >
                        Reset filters
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="mt-[42px] grid grid-cols-1 gap-[14px] sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
                    {pageDeals.map((deal) => (
                      <DealCard
                        key={deal.product.id}
                        href={`/product/${deal.product.id}`}
                        title={deal.product.name}
                        price={deal.product.price}
                        oldPrice={deal.product.oldCost ?? undefined}
                        discountPct={deal.discountPct}
                        image={deal.image}
                        rating={deal.product.rating}
                        reason={reasonLabel(deal.reason)}
                      />
                    ))}
                  </div>
                )}

                <DealsPagination
                  page={currentPage}
                  totalPages={totalPages}
                  onChange={(next) => {
                    setPage(next);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                />
              </>
            )}

            {/* Help */}
            <div className="mt-[42px]">
              <p className="text-[24px] font-medium leading-[130%] text-[#333333]/80">NEED HELP?</p>

              <p className="mt-[6px] text-[14px] font-medium leading-[130%]">
                <Link href="/customer-service" className="text-[#496B94] hover:underline">
                  Visit the help section
                </Link>
                <span className="text-[#333333]"> or </span>
                <Link href="/customer-service" className="text-[#496B94] hover:underline">
                  contact us
                </Link>
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
