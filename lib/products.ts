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

export interface CategoryCard {
  id: string;
  name: string;
  imageUrl: string;
}

interface CategoryNode {
  id?: string;
  name?: string;
  parentId?: string | null;
  sortOrder?: number;
}

/**
 * Root categories (sorted by sortOrder) that have at least one storefront product,
 * each with the main image of a product from that category; products placed
 * directly in the root category win over products from its subcategories.
 */
export function rootCategoryCards(
  products: unknown,
  categories: unknown,
  limit = 6,
): CategoryCard[] {
  if (!Array.isArray(products) || !Array.isArray(categories)) return [];

  const nodes = (categories as CategoryNode[]).filter(
    (c): c is CategoryNode & { id: string } => Boolean(c?.id),
  );
  const rootOf = new Map<string, string>();
  const parentOf = new Map(nodes.map((c) => [c.id, c.parentId ?? null]));
  for (const c of nodes) {
    let current: string = c.id;
    const seen = new Set<string>();
    while (parentOf.get(current) && !seen.has(current)) {
      seen.add(current);
      current = parentOf.get(current) as string;
    }
    rootOf.set(c.id, current);
  }

  const ownImage = new Map<string, string>();
  const subImage = new Map<string, string>();
  for (const product of products as (StorefrontCandidate & { categoryId?: string })[]) {
    if (!product?.categoryId || !isStorefrontProduct(product)) continue;
    const root = rootOf.get(product.categoryId);
    if (!root) continue;
    const target = root === product.categoryId ? ownImage : subImage;
    if (!target.has(root)) target.set(root, productImage(product));
  }

  return nodes
    .filter((c) => !c.parentId)
    .sort((a, b) => (a.sortOrder ?? Number.MAX_SAFE_INTEGER) - (b.sortOrder ?? Number.MAX_SAFE_INTEGER))
    .map((c) => ({
      id: c.id,
      name: c.name ?? "",
      imageUrl: ownImage.get(c.id) || subImage.get(c.id) || "",
    }))
    .filter((card) => card.imageUrl)
    .slice(0, limit);
}
