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
  imageUrl?: string | null;
  galleries?: { id: string; path: string; isMain?: boolean }[];
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
  stock: number;
  description: string;
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
    const payload = data as
      | { message?: string; title?: string; errors?: Record<string, string[]> }
      | null;

    let message =
      payload?.message ||
      payload?.title ||
      `Request failed with HTTP ${response.status}`;

    if (payload?.errors) {
      message = Object.values(payload.errors).flat().join(" ");
    }

    throw new SellerApiError(response.status, message);
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
      oldCost: null,
      sku: null,
      imageUrl: null,
      images: [],
    }),
  });
}

export function deleteSellerProduct(id: string): Promise<void> {
  return request<void>(`/products/${id}`, { method: "DELETE" });
}
