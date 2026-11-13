"use client";

// Checkout: cart → address and receiver → payment and promo code → POST /orders/checkout.
// The server takes the items from the user's cart, splits them by seller, checks stock and
// the promo code, creates the orders and empties the cart in one save.

import { getApi } from "@/components/api/useApi";
import { apiErrorMessage, readApiError } from "@/lib/apiError";
import { CART_UPDATED_EVENT } from "@/lib/cart";
import { mainImagePath } from "@/lib/media";
import { getSessionUserId } from "@/lib/session";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://treemiix-backend.onrender.com/api";

const authHeaders = (): Record<string, string> => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  return token ? { Authorization: `Bearer ${token}` } : {};
};

/** Thrown when the session is missing or expired: the page sends the user to /auth. */
export class SignInRequiredError extends Error {
  constructor() {
    super("Please sign in to continue.");
    this.name = "SignInRequiredError";
  }
}

// ---------- cart ----------

export interface CheckoutCartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  storeName?: string;
  sellerId?: string;
}

export interface CheckoutCart {
  items: CheckoutCartItem[];
  itemsCount: number;
  subtotal: number;
}

interface BackendCartItem {
  id: string;
  productId: string;
  price: number;
  quantity: number;
  product?: { name?: string; galleries?: { path?: string; isMain?: boolean }[] };
}

/** The user's cart with store names (an empty cart when the user has none yet). */
export async function loadCheckoutCart(): Promise<CheckoutCart> {
  if (!getSessionUserId()) throw new SignInRequiredError();

  const cartRes = await fetch(`${API_BASE_URL}/carts/my`, { headers: authHeaders() });
  if (cartRes.status === 401) throw new SignInRequiredError();
  if (cartRes.status === 404) return { items: [], itemsCount: 0, subtotal: 0 };
  if (!cartRes.ok) throw new Error(await readApiError(cartRes));
  const cart = await cartRes.json();

  const [itemsRes, productsRes] = await Promise.all([
    fetch(`${API_BASE_URL}/cartitems/bycart/${cart.id}`, { headers: authHeaders() }),
    // store names for "Sold by …" (one request for all products)
    getApi("/products").catch(() => null),
  ]);
  if (!itemsRes.ok) throw new Error(await readApiError(itemsRes));
  const data: BackendCartItem[] = await itemsRes.json();

  const sellers = new Map<string, { sellerId?: string; storeName?: string }>();
  if (productsRes?.response.ok && Array.isArray(productsRes.data)) {
    for (const p of productsRes.data as { id: string; sellerId?: string; seller?: { storeName?: string } }[]) {
      sellers.set(String(p.id), { sellerId: p.sellerId, storeName: p.seller?.storeName });
    }
  }

  const items = (Array.isArray(data) ? data : []).map((item) => ({
    id: String(item.id),
    productId: String(item.productId),
    name: item.product?.name || "Product",
    price: Number(item.price) || 0,
    quantity: Number(item.quantity) || 1,
    imageUrl: mainImagePath(item.product ?? {}),
    ...sellers.get(String(item.productId)),
  }));

  return {
    items,
    itemsCount: items.reduce((sum, i) => sum + i.quantity, 0),
    subtotal: Math.round(items.reduce((sum, i) => sum + i.price * i.quantity, 0) * 100) / 100,
  };
}

// ---------- addresses ----------

export interface UserAddress {
  id: string;
  country: string;
  city: string;
  street: string;
  building: string;
  apartment?: string | null;
  postalCode?: string | null;
  isDefault: boolean;
}

export type NewAddress = Omit<UserAddress, "id">;

export const formatAddress = (a: Omit<UserAddress, "id" | "isDefault">) =>
  [
    [a.street, a.building].filter(Boolean).join(" "),
    a.apartment ? `apt ${a.apartment}` : "",
    a.city,
    a.postalCode || "",
    a.country,
  ]
    .filter(Boolean)
    .join(", ");

export async function loadAddresses(): Promise<UserAddress[]> {
  const userId = getSessionUserId();
  if (!userId) throw new SignInRequiredError();
  const res = await fetch(`${API_BASE_URL}/useraddresses/byuser/${userId}`, { headers: authHeaders() });
  if (res.status === 401) throw new SignInRequiredError();
  if (!res.ok) throw new Error(await readApiError(res));
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

export async function createAddress(address: NewAddress): Promise<UserAddress> {
  const res = await fetch(`${API_BASE_URL}/useraddresses`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(address),
  });
  if (res.status === 401) throw new SignInRequiredError();
  if (!res.ok) throw new Error(await readApiError(res, "Couldn't save the address."));
  return res.json();
}

// ---------- draft between the steps ----------

export type PaymentChoice = "cash" | "card";

export const PAYMENT_LABELS: Record<PaymentChoice, string> = {
  cash: "Cash on delivery",
  card: "Card on delivery",
};

export interface CheckoutDraft {
  addressId?: string;
  shippingAddress?: string;
  receiverName?: string;
  receiverPhone?: string;
  /** Shown in the UI only: the backend does not store a payment method */
  payment?: PaymentChoice;
  promoCode?: string;
}

const DRAFT_KEY = "checkout-draft";
const RESULT_KEY = "checkout-result";

export function getDraft(): CheckoutDraft {
  try {
    return JSON.parse(sessionStorage.getItem(DRAFT_KEY) || "{}");
  } catch {
    return {};
  }
}

export function saveDraft(patch: Partial<CheckoutDraft>): CheckoutDraft {
  const next = { ...getDraft(), ...patch };
  try {
    sessionStorage.setItem(DRAFT_KEY, JSON.stringify(next));
  } catch {
    // storage unavailable: the steps still work within the page
  }
  return next;
}

// ---------- promo code (preview; the server re-checks it when the order is placed) ----------

export interface PromoPreview {
  code: string;
  discount: number;
}

interface BackendPromo {
  code: string;
  discountValue: number;
  discountType: string | number;
  minOrderAmount?: number | null;
  maxDiscountAmount?: number | null;
  maxActivations: number;
  usedActivationsCount: number;
  startsAt: string;
  expiresAt: string;
  isActive: boolean;
}

/** Looks up a promo code and estimates the discount; throws an Error with a readable message. */
export async function previewPromoCode(code: string, subtotal: number): Promise<PromoPreview> {
  const trimmed = code.trim();
  const res = await fetch(`${API_BASE_URL}/promocodes/code/${encodeURIComponent(trimmed)}`, { headers: authHeaders() });
  if (res.status === 404) throw new Error(`Promo code "${trimmed}" was not found.`);
  if (res.status === 401) throw new SignInRequiredError();
  if (!res.ok) throw new Error(await readApiError(res));
  const promo: BackendPromo = await res.json();

  const now = Date.now();
  if (!promo.isActive) throw new Error(`Promo code "${trimmed}" is not active.`);
  if (now < Date.parse(promo.startsAt)) throw new Error(`Promo code "${trimmed}" is not active yet.`);
  if (now > Date.parse(promo.expiresAt)) throw new Error(`Promo code "${trimmed}" has expired.`);
  if (promo.maxActivations > 0 && promo.usedActivationsCount >= promo.maxActivations) {
    throw new Error(`Promo code "${trimmed}" has been fully used.`);
  }
  if (promo.minOrderAmount && subtotal < promo.minOrderAmount) {
    throw new Error(`Promo code "${trimmed}" requires an order of at least $${promo.minOrderAmount.toFixed(2)}.`);
  }

  const isPercentage = promo.discountType === 0 || String(promo.discountType).toLowerCase() === "percentage";
  let discount = isPercentage ? (subtotal * promo.discountValue) / 100 : promo.discountValue;
  if (promo.maxDiscountAmount) discount = Math.min(discount, promo.maxDiscountAmount);
  discount = Math.round(Math.min(Math.max(discount, 0), subtotal) * 100) / 100;

  return { code: promo.code || trimmed, discount };
}

// ---------- placing the order ----------

export interface CheckoutOrderSummary {
  id: string;
  sellerId: string;
  storeName: string;
  itemsCount: number;
  totalAmount: number;
  discountAmount: number;
}

export interface CheckoutResult {
  orders: CheckoutOrderSummary[];
  subtotal: number;
  discount: number;
  total: number;
}

/** POST /orders/checkout; throws with the backend's message (out of stock, invalid promo code, …). */
export async function placeOrder(draft: CheckoutDraft): Promise<CheckoutResult> {
  const res = await fetch(`${API_BASE_URL}/orders/checkout`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify({
      shippingAddress: draft.shippingAddress,
      receiverName: draft.receiverName,
      receiverPhone: draft.receiverPhone,
      promoCode: draft.promoCode || null,
    }),
  });
  if (res.status === 401) throw new SignInRequiredError();

  const text = await res.text();
  let body: unknown = text;
  try {
    body = JSON.parse(text);
  } catch {
    // plain-text body
  }
  if (!res.ok) throw new Error(apiErrorMessage(body, res.status, "Couldn't place your order. Please try again."));

  const result = body as CheckoutResult;
  try {
    sessionStorage.setItem(RESULT_KEY, JSON.stringify(result));
    sessionStorage.removeItem(DRAFT_KEY);
  } catch {
    // ignore
  }
  window.dispatchEvent(new CustomEvent(CART_UPDATED_EVENT));
  return result;
}

export function getLastCheckoutResult(): CheckoutResult | null {
  try {
    const raw = sessionStorage.getItem(RESULT_KEY);
    return raw ? (JSON.parse(raw) as CheckoutResult) : null;
  } catch {
    return null;
  }
}

// ---------- orders ----------

const ORDER_STATUSES = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled", "Refunded"] as const;

/** Order status as a label; the backend sends the enum as a number. */
export function orderStatusLabel(status: unknown): string {
  if (typeof status === "number") return ORDER_STATUSES[status] ?? String(status);
  return typeof status === "string" && status ? status : "Pending";
}

export const formatMoney = (value: number) => `$${(Number(value) || 0).toFixed(2)}`;
