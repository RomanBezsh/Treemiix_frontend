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

const SELLER_STATUS_BY_INDEX: SellerStatus[] = [
  "Active",
  "Inactive",
  "Suspended",
  "PendingVerification",
  "Draft",
  "Rejected",
];

const SELLER_STATUS_MAP = new Map<string, SellerStatus>(
  SELLER_STATUS_BY_INDEX.map((status) => [status.toLowerCase(), status]),
);

const BUSINESS_TYPE_BY_INDEX: SellerBusinessType[] = [
  "Individual",
  "SoleProprietor",
  "Company",
];

const BUSINESS_TYPE_MAP = new Map<string, SellerBusinessType>(
  BUSINESS_TYPE_BY_INDEX.map((type) => [type.toLowerCase(), type]),
);

const SUBSCRIPTION_STATUS_BY_INDEX: SellerSubscriptionStatus[] = [
  "None",
  "Active",
  "PastDue",
  "Canceled",
];

const SUBSCRIPTION_STATUS_MAP = new Map<string, SellerSubscriptionStatus>(
  SUBSCRIPTION_STATUS_BY_INDEX.map((status) => [status.toLowerCase(), status]),
);

type SellerUserSummary = {
  email?: string;
  firstName?: string;
  lastName?: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function asString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function asNullableString(value: unknown): string | null {
  return typeof value === "string" ? value : null;
}

function normalizeSellerStatus(value: unknown): SellerStatus {
  if (typeof value === "number" && value >= 0 && value < SELLER_STATUS_BY_INDEX.length) {
    return SELLER_STATUS_BY_INDEX[value];
  }
  if (typeof value === "string") {
    const matched = SELLER_STATUS_MAP.get(value.trim().toLowerCase());
    if (matched) return matched;
  }
  return "Active";
}

function normalizeBusinessType(value: unknown): SellerBusinessType {
  if (typeof value === "number" && value >= 0 && value < BUSINESS_TYPE_BY_INDEX.length) {
    return BUSINESS_TYPE_BY_INDEX[value];
  }
  if (typeof value === "string") {
    const matched = BUSINESS_TYPE_MAP.get(value.trim().toLowerCase());
    if (matched) return matched;
  }
  return "Company";
}

function normalizeSubscriptionStatus(
  value: unknown,
  status: SellerStatus,
): SellerSubscriptionStatus {
  if (
    typeof value === "number" &&
    value >= 0 &&
    value < SUBSCRIPTION_STATUS_BY_INDEX.length
  ) {
    return SUBSCRIPTION_STATUS_BY_INDEX[value];
  }
  if (typeof value === "string") {
    const matched = SUBSCRIPTION_STATUS_MAP.get(value.trim().toLowerCase());
    if (matched) return matched;
  }
  return status === "Active" ? "Active" : "None";
}

function normalizeAdminSeller(
  raw: Record<string, unknown>,
  userMap?: Map<string, SellerUserSummary>,
): AdminSeller {
  const id = String(raw.id ?? "");
  const userId = String(raw.userId ?? "");
  const nestedUser = isRecord(raw.user) ? raw.user : undefined;
  const mappedUser = userId ? userMap?.get(userId) : undefined;
  const status = normalizeSellerStatus(raw.status);

  return {
    id,
    userId,
    userEmail:
      asString(raw.userEmail) ||
      asString(nestedUser?.email) ||
      mappedUser?.email ||
      "",
    userFirstName:
      asString(raw.userFirstName) ||
      asString(nestedUser?.firstName) ||
      mappedUser?.firstName ||
      "",
    userLastName:
      asString(raw.userLastName) ||
      asString(nestedUser?.lastName) ||
      mappedUser?.lastName ||
      "",
    storeName: String(raw.storeName ?? ""),
    storeSlug: String(raw.storeSlug ?? ""),
    logoUrl: asNullableString(raw.logoUrl),
    description: asNullableString(raw.description),
    businessType: normalizeBusinessType(raw.businessType),
    legalName: asNullableString(raw.legalName),
    country: asNullableString(raw.country),
    supportEmail: asNullableString(raw.supportEmail),
    supportPhone: asNullableString(raw.supportPhone),
    taxNumber: asNullableString(raw.taxNumber),
    legalAddress: asNullableString(raw.legalAddress),
    bankAccount: asNullableString(raw.bankAccount),
    rating: typeof raw.rating === "number" ? raw.rating : Number(raw.rating) || 0,
    status,
    commissionRate:
      typeof raw.commissionRate === "number"
        ? raw.commissionRate
        : Number(raw.commissionRate) || 0.1,
    onboardingStep:
      typeof raw.onboardingStep === "number" ? raw.onboardingStep : 4,
    createdAt:
      typeof raw.createdAt === "string"
        ? raw.createdAt
        : new Date().toISOString(),
    submittedAt: asNullableString(raw.submittedAt),
    approvedAt: asNullableString(raw.approvedAt),
    rejectedAt: asNullableString(raw.rejectedAt),
    rejectionReason: asNullableString(raw.rejectionReason),
    subscriptionStatus: normalizeSubscriptionStatus(
      raw.subscriptionStatus,
      status,
    ),
    subscriptionPaidUntil: asNullableString(raw.subscriptionPaidUntil),
    canSell: typeof raw.canSell === "boolean" ? raw.canSell : status === "Active",
  };
}

export async function getAdminSellers(
  status?: SellerStatus,
): Promise<AdminSeller[]> {
  const query = status ? `?status=${status}` : "";
  let adminError: unknown = null;

  try {
    const adminData = await request<unknown[]>(`/admin/sellers${query}`);
    if (Array.isArray(adminData) && (adminData.length > 0 || status)) {
      return adminData.filter(isRecord).map((item) => normalizeAdminSeller(item));
    }
  } catch (err) {
    adminError = err;
  }

  let sellersFailed = false;
  const [rawSellers, rawUsers] = await Promise.all([
    request<unknown[]>("/sellers").catch(() => {
      sellersFailed = true;
      return [] as unknown[];
    }),
    request<unknown[]>("/users").catch(() => [] as unknown[]),
  ]);

  const userMap = new Map<string, SellerUserSummary>();
  if (Array.isArray(rawUsers)) {
    for (const entry of rawUsers) {
      if (!isRecord(entry) || !entry.id) continue;
      userMap.set(String(entry.id), {
        email: asString(entry.email),
        firstName: asString(entry.firstName),
        lastName: asString(entry.lastName),
      });
    }
  }

  const discovered: Record<string, unknown>[] = Array.isArray(rawSellers)
    ? rawSellers.filter(isRecord)
    : [];

  if (discovered.length === 0) {
    const rawProducts = await request<unknown[]>("/products?isActive=true").catch(
      () => [] as unknown[],
    );
    if (Array.isArray(rawProducts)) {
      for (const product of rawProducts) {
        if (!isRecord(product)) continue;
        if (isRecord(product.seller)) {
          discovered.push({
            ...product.seller,
            id: product.seller.id ?? product.sellerId,
          });
        } else if (product.sellerId) {
          discovered.push({
            id: product.sellerId,
          });
        }
      }
    }
  }

  const deduplicated = new Map<string, AdminSeller>();
  for (const item of discovered) {
    const normalized = normalizeAdminSeller(item, userMap);
    if (!normalized.id) continue;
    if (!deduplicated.has(normalized.id)) {
      deduplicated.set(normalized.id, normalized);
    }
  }

  const normalizedList = Array.from(deduplicated.values());
  if (normalizedList.length === 0 && adminError && sellersFailed) {
    throw adminError;
  }

  return status
    ? normalizedList.filter((seller) => seller.status === status)
    : normalizedList;
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
