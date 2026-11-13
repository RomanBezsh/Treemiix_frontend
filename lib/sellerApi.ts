import { apiErrorMessage } from "@/lib/apiError";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://treemiix-backend.onrender.com/api";

export type SellerStatus =
  | "Draft"
  | "PendingVerification"
  | "Active"
  | "Rejected"
  | "Suspended"
  | "Inactive";

export type SellerBusinessType = "Individual" | "SoleProprietor" | "Company";

export type SellerSubscriptionStatus =
  | "None"
  | "Active"
  | "PastDue"
  | "Canceled";

export interface Seller {
  id: string;
  userId: string;
  storeName: string;
  storeSlug: string;
  logoUrl: string | null;
  description: string | null;
  businessType: SellerBusinessType;
  legalName: string | null;
  country: string | null;
  supportEmail: string | null;
  supportPhone: string | null;
  taxNumber?: string | null;
  legalAddress?: string | null;
  bankAccount?: string | null;
  rating: number;
  status: SellerStatus;
  commissionRate: number;
  onboardingStep: number;
  submittedAt: string | null;
  approvedAt: string | null;
  rejectedAt: string | null;
  rejectionReason: string | null;
  subscriptionStatus: SellerSubscriptionStatus;
  subscriptionPaidUntil: string | null;
  createdAt: string;
  canSell: boolean;
}

export interface AdminSeller extends Seller {
  userEmail: string;
  userFirstName: string;
  userLastName: string;
  taxNumber: string | null;
  legalAddress: string | null;
  bankAccount: string | null;
}

export interface SellerPlan {
  name: string;
  monthlyPrice: number;
  currency: string;
  periodDays: number;
}

export interface AuthPayload {
  token: string;
  expiresAt: string;
  refreshToken: string;
  refreshTokenExpiresAt: string;
  emailConfirmationRequired: boolean;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
  };
}

export interface SellerStartResponse {
  seller: Seller;
  auth: AuthPayload;
}

export interface SellerCategory {
  id: string;
  name: string;
}

export interface SellerProduct {
  id: string;
  name: string;
  slug: string;
  price: number;
  stock: number;
  description: string;
  categoryId: string;
  sellerId: string;
  oldCost?: number | null;
  isActive?: boolean;
  imageUrl?: string | null;
  galleries?: { id: string; path: string; isMain?: boolean; sortOrder?: number }[];
  // Detail fields are not edited in Seller Center but must survive PUT /products/{id},
  // which overwrites every field of the product.
  sku?: string | null;
  asin?: string | null;
  itemModelNumber?: string | null;
  manufacturer?: string | null;
  countryOfOrigin?: string | null;
  productDimensions?: string | null;
  itemWeight?: string | null;
  warrantyInfo?: string | null;
  features?: string | null;
  binding?: string | null;
  releaseDate?: string | null;
}

export interface BusinessForm {
  businessType: SellerBusinessType;
  legalName: string;
  country: string;
  taxNumber: string;
  legalAddress: string;
  supportEmail: string;
  supportPhone: string;
}

export interface StorefrontForm {
  storeName: string;
  storeSlug: string;
  logoUrl: string;
  description: string;
}

export interface PayoutForm {
  bankAccount: string;
}

export interface CreateProductForm {
  name: string;
  slug: string;
  categoryId: string;
  price: number;
  /** Price before the discount; shown as a deal when higher than price. */
  oldCost: number | null;
  stock: number;
  description: string;
  /** Image URLs, the first one is the main image. */
  images: string[];
}

export class SellerApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "SellerApiError";
    this.status = status;
  }
}

async function request<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const headers = new Headers(options.headers);
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  const text = await response.text();
  let data: unknown = null;

  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
  }

  if (!response.ok) {
    // Backend text ({ message }, plain text, validation errors), never a bare "Conflict"
    throw new SellerApiError(response.status, apiErrorMessage(data, response.status));
  }

  return data as T;
}

export function getSellerPlan(): Promise<SellerPlan> {
  return request<SellerPlan>("/sellers/plans");
}

export async function getMySeller(): Promise<Seller | null> {
  try {
    return await request<Seller>("/sellers/me");
  } catch (error) {
    if (error instanceof SellerApiError && error.status === 404) {
      return null;
    }
    throw error;
  }
}

export function startSellerOnboarding(): Promise<SellerStartResponse> {
  return request<SellerStartResponse>("/sellers/onboarding/start", {
    method: "POST",
  });
}

export function updateSellerBusiness(
  form: BusinessForm,
): Promise<Seller> {
  return request<Seller>("/sellers/onboarding/business", {
    method: "PUT",
    body: JSON.stringify(form),
  });
}

export function updateSellerStorefront(
  form: StorefrontForm,
): Promise<Seller> {
  return request<Seller>("/sellers/onboarding/storefront", {
    method: "PUT",
    body: JSON.stringify(form),
  });
}

export function updateSellerPayout(form: PayoutForm): Promise<Seller> {
  return request<Seller>("/sellers/onboarding/payout", {
    method: "PUT",
    body: JSON.stringify(form),
  });
}

export function submitSellerOnboarding(): Promise<{
  message: string;
  seller: Seller;
}> {
  return request("/sellers/onboarding/submit", { method: "POST" });
}

export function getAdminSellers(
  status?: SellerStatus,
): Promise<AdminSeller[]> {
  const query = status ? `?status=${status}` : "";
  return request<AdminSeller[]>(`/admin/sellers${query}`);
}

export function getAdminSeller(id: string): Promise<AdminSeller> {
  return request<AdminSeller>(`/admin/sellers/${id}`);
}

export function approveSeller(id: string): Promise<Seller> {
  return request<Seller>(`/admin/sellers/${id}/approve`, {
    method: "POST",
  });
}

export function rejectSeller(id: string, reason: string): Promise<Seller> {
  return request<Seller>(`/admin/sellers/${id}/reject`, {
    method: "POST",
    body: JSON.stringify({ reason }),
  });
}

export function suspendSeller(id: string): Promise<Seller> {
  return request<Seller>(`/admin/sellers/${id}/suspend`, {
    method: "POST",
  });
}

export function reactivateSeller(id: string): Promise<Seller> {
  return request<Seller>(`/admin/sellers/${id}/reactivate`, {
    method: "POST",
  });
}

export function markSellerSubscriptionPaid(
  id: string,
  paidUntil?: string,
): Promise<Seller> {
  return request<Seller>(`/admin/sellers/${id}/subscription/paid`, {
    method: "POST",
    body: JSON.stringify({ paidUntil: paidUntil ?? null }),
  });
}

export function getCategories(): Promise<SellerCategory[]> {
  return request<SellerCategory[]>("/categories");
}

export function getSellerProducts(sellerId: string): Promise<SellerProduct[]> {
  return request<SellerProduct[]>(
    `/products?sellerId=${encodeURIComponent(sellerId)}&isActive=true`,
  );
}

export function createSellerProduct(
  form: CreateProductForm,
): Promise<SellerProduct> {
  return request<SellerProduct>("/products", {
    method: "POST",
    body: JSON.stringify({
      ...form,
      sku: null,
      imageUrl: form.images[0] ?? null,
      images: form.images,
    }),
  });
}

/**
 * PUT /products/{id} replaces every field, so detail fields that Seller Center
 * does not edit (SKU, manufacturer, features...) are sent back unchanged.
 * The backend keeps the current gallery when images is empty.
 */
export function updateSellerProduct(
  product: SellerProduct,
  form: CreateProductForm,
): Promise<void> {
  return request<void>(`/products/${product.id}`, {
    method: "PUT",
    body: JSON.stringify({
      sellerId: product.sellerId,
      sku: product.sku ?? null,
      asin: product.asin ?? null,
      itemModelNumber: product.itemModelNumber ?? null,
      manufacturer: product.manufacturer ?? null,
      countryOfOrigin: product.countryOfOrigin ?? null,
      productDimensions: product.productDimensions ?? null,
      itemWeight: product.itemWeight ?? null,
      warrantyInfo: product.warrantyInfo ?? null,
      features: product.features ?? null,
      binding: product.binding ?? null,
      releaseDate: product.releaseDate ?? null,
      ...form,
      imageUrl: form.images[0] ?? null,
      images: form.images,
    }),
  });
}

export function deleteSellerProduct(id: string): Promise<void> {
  return request<void>(`/products/${id}`, { method: "DELETE" });
}
