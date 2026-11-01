export type DealsView = "all" | "for-you";
export type DealType = "all" | "top-rated" | "best-discount" | "almost-gone";
export type DealsSort = "featured" | "discount" | "price-low" | "price-high" | "rating";

export interface DealsFilters {
  view: DealsView;
  departments: string[]; // category ids
  dealType: DealType;
  minPrice: number | null;
  maxPrice: number | null;
  minDiscount: number; // %
  minRating: number; // 0 = any
}

export const initialDealsFilters: DealsFilters = {
  view: "all",
  departments: [],
  dealType: "all",
  minPrice: null,
  maxPrice: null,
  minDiscount: 0,
  minRating: 0,
};

export const DEAL_TYPES: { value: DealType; label: string }[] = [
  { value: "all", label: "All deals" },
  { value: "top-rated", label: "Top rated" },
  { value: "best-discount", label: "Best discount (20%+)" },
  { value: "almost-gone", label: "Almost gone" },
];

// Thresholds fit the current catalog (discounts are mostly 5–25%)
export const DISCOUNT_OPTIONS = [0, 5, 10, 20, 30];

export const SORT_OPTIONS: { value: DealsSort; label: string }[] = [
  { value: "featured", label: "Recommended" },
  { value: "discount", label: "Biggest discount" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Avg. Customer Review" },
];

export const ALMOST_GONE_STOCK = 10;
export const TOP_RATED_MIN = 4.5;
export const BEST_DISCOUNT_MIN = 20;
