// Product media helpers shared by the admin panel and Seller Center.
// Files are stored by the backend (POST /upload/media, /upload/import).

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://treemiix-backend.onrender.com/api";
const MEDIA_BASE_URL = API_BASE_URL.replace(/\/api$/, "");

/** The backend rejects larger files with "File is too large (max 500 KB)". */
export const MAX_IMAGE_KB = 500;
export const MAX_IMAGE_BYTES = MAX_IMAGE_KB * 1024;

const getAuthHeaders = (): Record<string, string> => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const toAbsoluteMediaUrl = (path: string) =>
  path.startsWith("/") ? `${MEDIA_BASE_URL}${path}` : path;

async function errorMessageOf(res: Response): Promise<string> {
  const body = await res.json().catch(() => null);
  if (typeof body === "string") return body;
  return body?.message || body?.title || res.statusText || `HTTP ${res.status}`;
}

/** Uploads one file and returns its absolute URL. Throws on failure. */
export async function uploadMediaFile(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_BASE_URL}/upload/media`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: formData,
  });
  if (!res.ok) throw new Error(await errorMessageOf(res));

  const json = await res.json();
  if (!json?.path) throw new Error("The server did not return a file path.");
  return toAbsoluteMediaUrl(json.path);
}

/** Copies a remote file into backend storage and returns its absolute URL. Throws on failure. */
export async function importMediaUrl(url: string): Promise<string> {
  const res = await fetch(`${API_BASE_URL}/upload/import`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...getAuthHeaders() },
    body: JSON.stringify({ url }),
  });
  if (!res.ok) throw new Error(await errorMessageOf(res));

  const json = await res.json();
  if (!json?.path) throw new Error("The server did not return a file path.");
  return toAbsoluteMediaUrl(json.path);
}

type GalleryItem = { path?: string; isMain?: boolean; sortOrder?: number };

export interface ProductWithImages {
  imageUrl?: string | null;
  images?: string[];
  galleries?: GalleryItem[];
  productGalleries?: GalleryItem[];
}

/**
 * Image paths of a product, main image first: the gallery item with isMain,
 * then the rest by sortOrder. The API returns galleries unordered.
 */
export function productImagePaths(product: ProductWithImages): string[] {
  if (product.images && product.images.length > 0) return product.images;

  const gallery = product.galleries?.length
    ? product.galleries
    : product.productGalleries ?? [];
  const paths = [...gallery]
    .sort(
      (a, b) =>
        Number(b.isMain ?? false) - Number(a.isMain ?? false) ||
        (a.sortOrder ?? 0) - (b.sortOrder ?? 0),
    )
    .map((g) => g.path)
    .filter((path): path is string => Boolean(path));

  if (paths.length > 0) return paths;
  return product.imageUrl ? [product.imageUrl] : [];
}

/** Main image of a product (isMain, otherwise the first one), or "". */
export function mainImagePath(product: ProductWithImages): string {
  return productImagePaths(product)[0] ?? "";
}
