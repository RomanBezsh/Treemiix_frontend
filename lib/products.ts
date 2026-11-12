import { mainImagePath } from "@/lib/media";

// One request for all active products instead of one request per category
// (~70 requests per page used to hit the backend rate limit and return 429).
export const ACTIVE_PRODUCTS_PATH = "/products?isActive=true";

export interface StorefrontCandidate {
  isActive?: boolean;
  imageUrl?: string | null;
  images?: string[];
  galleries?: { path?: string }[];
  productGalleries?: { path?: string }[];
  seller?: { status?: string } | null;
}

/** Main image of a product (isMain, otherwise the first one), or "". */
export function productImage(product: StorefrontCandidate): string {
  return mainImagePath(product);
}

/**
 * Storefront rule: a product is shown to buyers only when it is active,
 * has at least one image and its seller is approved (status Active).
 */
export function isStorefrontProduct(product: StorefrontCandidate): boolean {
  return (
    product.isActive !== false &&
    Boolean(productImage(product)) &&
    product.seller?.status === "Active"
  );
}

/**
 * Orders products the same way the old per-category loading did:
 * grouped by category in the order of `categories`, keeping the API order
 * inside each category. Products of categories missing from the list are dropped.
 */
export function orderByCategories<T extends { categoryId?: string }>(
  products: unknown,
  categories: unknown,
): T[] {
  if (!Array.isArray(products) || !Array.isArray(categories)) return [];

  const byCategory = new Map<string, T[]>();
  for (const product of products as T[]) {
    if (!product?.categoryId) continue;
    const bucket = byCategory.get(product.categoryId);
    if (bucket) bucket.push(product);
    else byCategory.set(product.categoryId, [product]);
  }

  return (categories as { id?: string }[]).flatMap((category) =>
    (category?.id && byCategory.get(category.id)) || [],
  );
}
