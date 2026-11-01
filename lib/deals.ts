/**
 * Today's Deals: a small client-side recommendation system.
 *
 * Every product with oldCost > price is a deal. Each deal gets a score from 0 to 1:
 *   discount  45%  — bigger discount, higher score (capped at 40% off)
 *   interest  30%  — the user recently viewed products from this category or has it in the cart
 *   rating    15%  — product rating out of 5
 *   freshness  5%  — added in the last 14 days
 *   urgency    5%  — only a few left in stock
 * Out-of-stock deals and products already in the cart are skipped.
 * Signals come from the browser (recently viewed) and the backend cart, so it works without
 * any recommendation endpoint. Weights are constants below — easy to tune and to explain.
 */

export interface DealProduct {
  id: string;
  name: string;
  price: number;
  oldCost?: number | null;
  rating?: number;
  stock?: number;
  categoryId?: string;
  createdAt?: string;
  imageUrl?: string;
  images?: string[];
  galleries?: { path: string }[];
  productGalleries?: { path: string }[];
}

export interface DealCategory {
  id: string;
  name: string;
}

export interface UserSignals {
  /** Product ids from "recently viewed", most recent first */
  viewedIds: string[];
  /** Product ids currently in the cart */
  cartIds: string[];
}

export type DealReason =
  | { kind: "viewed"; category: string }
  | { kind: "cart"; category: string }
  | { kind: "discount" }
  | { kind: "rating" }
  | { kind: "low-stock" };

export interface ScoredDeal {
  product: DealProduct;
  image: string;
  discountPct: number;
  score: number;
  /** 0..1, how much the user is into this category */
  interest: number;
  reason: DealReason | null;
}

const WEIGHTS = { discount: 0.45, interest: 0.3, rating: 0.15, freshness: 0.05, urgency: 0.05 };
const MAX_COUNTED_DISCOUNT = 40; // % — anything above counts as a full score
const FRESH_DAYS = 14;
const LOW_STOCK = 5;
const CART_CATEGORY_WEIGHT = 1.5; // a category in the cart counts more than one view

export const getProductImage = (product: DealProduct) =>
  product.imageUrl ||
  product.images?.[0] ||
  product.galleries?.[0]?.path ||
  product.productGalleries?.[0]?.path ||
  "";

export const getDiscountPct = (product: DealProduct) =>
  product.oldCost && product.oldCost > product.price
    ? Math.round((1 - product.price / product.oldCost) * 100)
    : 0;

export const reasonLabel = (reason: DealReason | null): string | null => {
  if (!reason) return null;
  switch (reason.kind) {
    case "viewed":
      return `Because you viewed ${reason.category}`;
    case "cart":
      return `Goes with your cart: ${reason.category}`;
    case "discount":
      return "One of today's biggest discounts";
    case "rating":
      return "Top rated by customers";
    case "low-stock":
      return "Almost gone";
  }
};

/** Category affinity 0..1 from viewed products (recent views weigh more) and cart products. */
function buildCategoryInterest(products: DealProduct[], signals: UserSignals) {
  const categoryOf = new Map(products.map((product) => [String(product.id), product.categoryId]));
  const raw = new Map<string, number>();
  const fromCart = new Set<string>();

  signals.viewedIds.slice(0, 20).forEach((id, index) => {
    const category = categoryOf.get(String(id));
    if (!category) return;
    const recency = 1 / (1 + index * 0.25); // 1, 0.8, 0.67, ...
    raw.set(category, (raw.get(category) ?? 0) + recency);
  });

  signals.cartIds.forEach((id) => {
    const category = categoryOf.get(String(id));
    if (!category) return;
    raw.set(category, (raw.get(category) ?? 0) + CART_CATEGORY_WEIGHT);
    fromCart.add(category);
  });

  const max = Math.max(0, ...raw.values());
  const interest = new Map<string, number>();
  raw.forEach((value, category) => interest.set(category, max > 0 ? value / max : 0));
  return { interest, fromCart };
}

export function scoreDeals(
  products: DealProduct[],
  categories: DealCategory[],
  signals: UserSignals,
  now: number = Date.now()
): ScoredDeal[] {
  const categoryName = new Map(categories.map((category) => [String(category.id), category.name]));
  const { interest, fromCart } = buildCategoryInterest(products, signals);
  const inCart = new Set(signals.cartIds.map(String));

  return products
    .filter((product) => getDiscountPct(product) > 0)
    .filter((product) => (product.stock ?? 1) > 0)
    .filter((product) => !inCart.has(String(product.id)))
    .map((product) => {
      const discountPct = getDiscountPct(product);
      const category = product.categoryId ? String(product.categoryId) : "";
      const userInterest = interest.get(category) ?? 0;
      const rating = Math.max(0, Math.min(5, Number(product.rating) || 0));
      const ageDays = product.createdAt ? (now - new Date(product.createdAt).getTime()) / 86_400_000 : Infinity;
      const stock = product.stock ?? 99;

      const score =
        WEIGHTS.discount * Math.min(discountPct, MAX_COUNTED_DISCOUNT) / MAX_COUNTED_DISCOUNT +
        WEIGHTS.interest * userInterest +
        WEIGHTS.rating * (rating / 5) +
        WEIGHTS.freshness * (ageDays <= FRESH_DAYS ? 1 : 0) +
        WEIGHTS.urgency * (stock <= LOW_STOCK ? 1 : 0);

      const name = categoryName.get(category) ?? "this category";
      let reason: DealReason | null = null;
      if (userInterest >= 0.35) reason = fromCart.has(category) ? { kind: "cart", category: name } : { kind: "viewed", category: name };
      else if (discountPct >= 20) reason = { kind: "discount" };
      else if (rating >= 4.5) reason = { kind: "rating" };
      else if (stock <= LOW_STOCK) reason = { kind: "low-stock" };

      return { product, image: getProductImage(product), discountPct, score, interest: userInterest, reason };
    })
    .sort((a, b) => b.score - a.score);
}

/** Reads "recently viewed" saved by the product page (localStorage, most recent first). */
export function readViewedIds(): string[] {
  try {
    const stored = JSON.parse(localStorage.getItem("recentlyViewedProducts") || "[]");
    return Array.isArray(stored) ? stored.map((item) => String(item?.id)).filter(Boolean) : [];
  } catch {
    return [];
  }
}
