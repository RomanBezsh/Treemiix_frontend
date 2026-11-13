"use client";

import { readApiError } from "@/lib/apiError";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://treemiix-backend.onrender.com/api";

/** Fired after the cart changes; the header reloads the cart count on it. */
export const CART_UPDATED_EVENT = "cart-updated";

/** Cart item as returned by POST /cartitems. */
export interface AddedCartItem {
  id: string;
  price?: number;
  quantity?: number;
}

export type AddToCartResult =
  | { ok: true; item: AddedCartItem }
  // not signed in or the session expired: the caller sends the user to /auth
  | { ok: false; reason: "auth" }
  | { ok: false; reason: "error"; message: string };

/**
 * Adds a product to the signed-in user's cart, creating the cart on first use
 * (GET /carts/my → 404 → POST /carts). Shared by the product page, the cart's
 * "Recently viewed" block and Your Lists.
 */
export async function addToCart(productId: string, quantity = 1): Promise<AddToCartResult> {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (!token) return { ok: false, reason: "auth" };

  const authHeaders = { Authorization: `Bearer ${token}` };

  try {
    let cartId: string | null = null;

    const cartRes = await fetch(`${API_BASE_URL}/carts/my`, { headers: authHeaders });
    if (cartRes.status === 401) return { ok: false, reason: "auth" };

    if (cartRes.ok) {
      const cart = await cartRes.json();
      cartId = cart?.id || null;
    } else if (cartRes.status === 404) {
      const createRes = await fetch(`${API_BASE_URL}/carts`, { method: "POST", headers: authHeaders });
      if (createRes.status === 401) return { ok: false, reason: "auth" };
      if (!createRes.ok) return { ok: false, reason: "error", message: await readApiError(createRes) };
      const created = await createRes.json();
      cartId = created?.id || null;
    } else {
      return { ok: false, reason: "error", message: await readApiError(cartRes) };
    }

    if (!cartId) return { ok: false, reason: "error", message: "Couldn't open your cart. Please try again." };

    const addRes = await fetch(`${API_BASE_URL}/cartitems`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...authHeaders },
      body: JSON.stringify({ cartId, productId, quantity }),
    });
    if (addRes.status === 401) return { ok: false, reason: "auth" };
    if (!addRes.ok) return { ok: false, reason: "error", message: await readApiError(addRes) };

    const item = (await addRes.json().catch(() => ({}))) as AddedCartItem;
    window.dispatchEvent(new CustomEvent(CART_UPDATED_EVENT));
    return { ok: true, item };
  } catch (error) {
    console.warn("Error adding to cart", error);
    return { ok: false, reason: "error", message: "Couldn't reach the server. Please try again." };
  }
}
