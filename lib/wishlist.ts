"use client";

// Wishlist ("Your Lists"), stored in localStorage per signed-in user.
//
// The public API below is what the UI uses; to move the wishlist to the backend later,
// replace only this file's internals (e.g. GET/PUT/DELETE /api/wishlist) and keep:
//   useWishlistIds(), useWishlistCount(), toggleWishlist(), removeFromWishlist(),
//   loadWishlist(), isSignedIn(), WISHLIST_UPDATED_EVENT.
// Mutations are already async, so callers do not change when they start hitting the API.

import { useMemo, useSyncExternalStore } from "react";
import { getApi } from "@/components/api/useApi";
import { apiErrorMessage } from "@/lib/apiError";
import { getSessionUserId } from "@/lib/session";
import { AUTH_CHANGED_EVENT } from "@/lib/authSession";
import { mainImagePath } from "@/lib/media";
import { isStorefrontProduct, type StorefrontCandidate } from "@/lib/products";

/** Fired after the current user's wishlist changes (same tab; other tabs get "storage"). */
export const WISHLIST_UPDATED_EVENT = "wishlist-updated";

const STORAGE_PREFIX = "wishlist:";
interface StoredEntry {
  productId: string;
  addedAt: string;
}

const currentUserId = getSessionUserId;

function storageKey(): string | null {
  const userId = currentUserId();
  return userId ? `${STORAGE_PREFIX}${userId}` : null;
}

function parseEntries(raw: string | null): StoredEntry[] {
  if (!raw) return [];
  try {
    const data = JSON.parse(raw);
    return Array.isArray(data)
      ? data.filter((e): e is StoredEntry => typeof e?.productId === "string" && typeof e?.addedAt === "string")
      : [];
  } catch {
    return [];
  }
}

function readEntries(): StoredEntry[] {
  const key = storageKey();
  return key ? parseEntries(localStorage.getItem(key)) : [];
}

function writeEntries(entries: StoredEntry[]): void {
  const key = storageKey();
  if (!key) return;
  localStorage.setItem(key, JSON.stringify(entries));
  window.dispatchEvent(new Event(WISHLIST_UPDATED_EVENT));
}

/** True when a user is signed in (only signed-in users have a wishlist). */
export function isSignedIn(): boolean {
  return currentUserId() !== null;
}

// ---------- React subscription ----------

function subscribe(onChange: () => void) {
  window.addEventListener(WISHLIST_UPDATED_EVENT, onChange);
  // The list is per user, so sign-in/out switches it
  window.addEventListener(AUTH_CHANGED_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(WISHLIST_UPDATED_EVENT, onChange);
    window.removeEventListener(AUTH_CHANGED_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

// The raw stored string is a stable snapshot (same string → no re-render)
function getSnapshot(): string {
  const key = storageKey();
  return key ? localStorage.getItem(key) ?? "[]" : "";
}

/** Product ids in the current user's wishlist (empty for guests and during server render). */
export function useWishlistIds(): ReadonlySet<string> {
  const raw = useSyncExternalStore(subscribe, getSnapshot, () => "");
  return useMemo(() => new Set(parseEntries(raw).map((e) => e.productId)), [raw]);
}

/** Number of products in the current user's wishlist. */
export function useWishlistCount(): number {
  return useWishlistIds().size;
}

// ---------- mutations ----------

export type WishlistResult =
  | { status: "added" | "removed" }
  // not signed in: the caller sends the user to /auth
  | { status: "auth" }
  | { status: "error"; message: string };

/** Adds the product, or removes it if it is already in the wishlist. */
export async function toggleWishlist(productId: string): Promise<WishlistResult> {
  if (!isSignedIn()) return { status: "auth" };
  const entries = readEntries();
  if (entries.some((e) => e.productId === productId)) {
    writeEntries(entries.filter((e) => e.productId !== productId));
    return { status: "removed" };
  }
  writeEntries([{ productId, addedAt: new Date().toISOString() }, ...entries]);
  return { status: "added" };
}

export async function removeFromWishlist(productId: string): Promise<WishlistResult> {
  if (!isSignedIn()) return { status: "auth" };
  writeEntries(readEntries().filter((e) => e.productId !== productId));
  return { status: "removed" };
}

// ---------- Your Lists page ----------

export interface WishlistProduct {
  id: string;
  name: string;
  price: number;
  oldCost?: number | null;
  stock: number;
  imageUrl: string;
  storeName?: string;
}

export interface WishlistItem {
  productId: string;
  addedAt: string;
  /** null when the product no longer exists */
  product: WishlistProduct | null;
  /** false when the product is gone, inactive or its seller is not approved */
  available: boolean;
}

type ApiProduct = StorefrontCandidate & {
  id: string;
  name: string;
  price: number;
  oldCost?: number | null;
  stock?: number;
  seller?: { status?: string; storeName?: string } | null;
};

/** Wishlist items, newest first, joined with current product data. Throws if products can't be loaded. */
export async function loadWishlist(): Promise<WishlistItem[]> {
  const entries = readEntries();
  if (entries.length === 0) return [];

  // All products (not only active ones) so removed-from-sale items can still be shown by name
  const { response, data } = await getApi("/products");
  if (!response.ok || !Array.isArray(data)) {
    throw new Error(apiErrorMessage(data, response.status));
  }
  const byId = new Map((data as ApiProduct[]).map((p) => [String(p.id), p]));

  return entries.map((entry) => {
    const p = byId.get(entry.productId);
    return {
      productId: entry.productId,
      addedAt: entry.addedAt,
      product: p
        ? {
            id: String(p.id),
            name: p.name,
            price: Number(p.price) || 0,
            oldCost: p.oldCost ?? null,
            stock: Number(p.stock) || 0,
            imageUrl: mainImagePath(p),
            storeName: p.seller?.storeName,
          }
        : null,
      available: Boolean(p && isStorefrontProduct(p)),
    };
  });
}
